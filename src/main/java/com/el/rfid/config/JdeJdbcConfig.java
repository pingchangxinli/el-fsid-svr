package com.el.rfid.config;

import com.el.core.jdbc.JdbcProperties;
import com.el.core.jdbc.PurifyStringTypeHandler;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.type.TypeHandler;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import javax.sql.DataSource;

@Configuration
@EnableConfigurationProperties({JdeJdbcProperties.class})
@MapperScan(basePackages = "com.el.rfid.mapper.jde", sqlSessionFactoryRef = "jdeSqlSessionFactory")
public class JdeJdbcConfig {
    private static final Logger log = LoggerFactory.getLogger(JdeJdbcConfig.class);
    @Autowired
    private JdeJdbcProperties jdeJdbcProperties;

    public JdeJdbcConfig() {
    }

    @Bean(name = "jdeDataSource")
    public DataSource jdeDataSource() {
        log.info("[JDE-JDBC] dataSource: {}", this.jdeJdbcProperties);
        org.apache.tomcat.jdbc.pool.DataSource dataSource = new org.apache.tomcat.jdbc.pool.DataSource();
        dataSource.setPoolProperties(this.jdeJdbcProperties);
        dataSource.setValidationQuery("select 1 from dual");
        return dataSource;
    }

    @Bean("jdeTransactioinManager")

    public PlatformTransactionManager annotationDrivenTransactionManager(@Qualifier("jdeDataSource") DataSource jdeDataSource) {
        log.info("[JDE-JDBC] annotationDrivenTransactionManager");
        return new DataSourceTransactionManager(this.jdeDataSource());
    }

    @Bean(name = "jdeSqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("jdeDataSource") DataSource jdeDataSource) throws Exception {
        log.info("[JDE-JDBC] sqlSessionFactory");
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setTypeHandlers(new TypeHandler[]{new PurifyStringTypeHandler()});
        sessionFactoryBean.setDataSource(this.jdeDataSource());
        return sessionFactoryBean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("jdeDataSource") DataSource jdeDataSource) throws Exception {
        log.info("[JDE-JDBC] sqlSessionTemplate");
        return new SqlSessionTemplate(this.sqlSessionFactory(jdeDataSource));
    }
}
