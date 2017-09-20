package com.el.rfid.config;

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
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableConfigurationProperties({RfidJdbcProperties.class})
@MapperScan(basePackages = "com.el.rfid.mapper.rfid", sqlSessionFactoryRef = "rfidSqlSessionFactory")
public class RfidJdbcConfig {
    private static final Logger log = LoggerFactory.getLogger(JdeJdbcConfig.class);
    @Autowired
    private RfidJdbcProperties rfidJdbcProperties;

    public RfidJdbcConfig() {
    }

    @Bean(name = "rfidDataSource")
    @Primary
    public DataSource rfidDataSource() {
        log.info("[RFID-JDBC] dataSource: {}", this.rfidJdbcProperties);
        org.apache.tomcat.jdbc.pool.DataSource dataSource = new org.apache.tomcat.jdbc.pool.DataSource();
        dataSource.setPoolProperties(this.rfidJdbcProperties);
        dataSource.setValidationQuery("select 1 from dual");
        return dataSource;
    }

    @Bean("rfidTransactioinManager")
    @Primary
    public PlatformTransactionManager annotationDrivenTransactionManager(@Qualifier("rfidDataSource") DataSource rfidDataSource) {
        log.info("[RFID-JDBC] annotationDrivenTransactionManager");
        return new DataSourceTransactionManager(this.rfidDataSource());
    }

    @Bean(name = "rfidSqlSessionFactory")
    @Primary
    public SqlSessionFactory sqlSessionFactory(@Qualifier("rfidDataSource") DataSource rfidDataSource) throws Exception {
        log.info("[RFID-JDBC] sqlSessionFactory");
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setTypeHandlers(new TypeHandler[]{new PurifyStringTypeHandler()});
        sessionFactoryBean.setDataSource(this.rfidDataSource());
        return sessionFactoryBean.getObject();
    }

    @Bean
    @Primary
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("rfidDataSource") DataSource rfidDataSource) throws Exception {
        log.info("[RFID-JDBC] sqlSessionTemplate");
        return new SqlSessionTemplate(this.sqlSessionFactory(rfidDataSource));
    }
}
