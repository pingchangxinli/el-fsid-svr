package com.el.demo.mapper;

import com.el.core.util.SqlUtil;
import com.el.demo.controller.DemoDpQuery;
import com.el.demo.datapower.DemoDpSql;
import com.el.demo.domain.DemoMsg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/4/21
 */
public interface DemoMsgMapper {

    @Insert({
            "insert into S_DEMO_MSGS (EMPL_ID, DEPT_ID, ",
            "SUBJECT, CONTENT, ",
            "POST_AT, COST)",
            "values (#{emplId,jdbcType=INTEGER}, #{deptId,jdbcType=INTEGER}, ",
            "#{subject,jdbcType=VARCHAR}, #{content,jdbcType=VARCHAR}, ",
            "#{postAt,jdbcType=TIMESTAMP}, #{cost,jdbcType=DECIMAL})"
    })
    @SelectKey(statement = "SELECT LAST_INSERT_ID()", keyProperty = "id", before = false, resultType = Integer.class)
    int insertMsg(DemoMsg msg);

    class Sql extends DemoDpSql {

        static final String MSGS_OF_SQL = "msgsOfSql";

        public String msgsOfSql(@Param("q") DemoDpQuery query) {
            SELECT("t1.ID id, t1.EMPL_ID emplId, t1.DEPT_ID deptId");
            SELECT("t1.SUBJECT subject, t1.CONTENT content, t1.POST_AT postAt");
            WHERE(query);
            ORDER_BY(query);
            return SqlUtil.paging(toString(), query);
        }

        static final String MSG_COUNT_OF_SQL = "msgCountOfSql";

        public String msgCountOfSql(@Param("q") DemoDpQuery query) {
            SELECT("COUNT(1) n");
            WHERE(query);
            return toString();
        }

        private void WHERE(DemoDpQuery query) {
            FROM("S_DEMO_MSGS t1");
            WHERE(query.getDpc(), "t1.DEPT_ID", "t1.EMPL_ID");
            if (!StringUtils.isEmpty(query.getKeyword())) {
                WHERE("t1.SUBJECT like " + SqlUtil.toSqlLikeString(query.getKeyword()));
            }
            // WHERE("t1.POST_AT >= #{q.since}");
            WHERE("t1.POST_AT >= #{q.when}");
        }
    }

    /**
     * @param query 查询条件
     * @return {结果描述}
     */
    @SelectProvider(type = Sql.class, method = Sql.MSGS_OF_SQL)
    List<DemoMsg> msgsOf(@Param("q") DemoDpQuery query);

    /**
     * @param query 查询条件
     * @return {结果描述}
     */
    @SelectProvider(type = Sql.class, method = Sql.MSG_COUNT_OF_SQL)
    int msgCountOf(@Param("q") DemoDpQuery query);
}
