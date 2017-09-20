package com.el.demo.mapper;

import com.el.core.domain.IdText;
import com.el.core.util.SqlUtil;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.mapping.StatementType;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

/**
 * @author neo.pan
 * @since 16/10/24
 */
public interface DemoMapper {

    class SqlProvider extends SQL {

        private static final String USER_NAME_OF_SQL = "userNameOfSql";

        public String userNameOfSql() {
            FROM("S_USERS");
            WHERE("ID = #{userId}");
            SELECT("USER_NAME");
            return toString();
        }

        private static final String USERS_LIKE_SQL = "usersLikeSql";

        public String usersLikeSql(@Param("usernameLike") String usernameLike) {
            FROM("S_USERS");
            if (!StringUtils.hasText(usernameLike)) {
                WHERE("USER_NAME like  " + SqlUtil.toSqlLikeString(usernameLike));
            }
            SELECT("ID \"id\", USER_NAME \"text\"");
            return toString();
        }
    }

    @SelectProvider(type = SqlProvider.class, method = SqlProvider.USER_NAME_OF_SQL)
    String userNameOf(@Param("userId") Integer userId);

    @SelectProvider(type = SqlProvider.class, method = SqlProvider.USERS_LIKE_SQL)
    List<IdText> usersLike(@Param("usernameLike") String usernameLike);

    @Select("call REFRESH_PROJ(#{date})")
    @Options(statementType = StatementType.CALLABLE)
    String callRefreshProj(@Param("date") Date date);
}
