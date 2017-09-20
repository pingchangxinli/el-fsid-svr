//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.el.rfid.config;

import com.el.core.util.SqlUtil;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "jde.jdbc")
public class JdeJdbcProperties extends PoolProperties {
    private static final Logger log = LoggerFactory.getLogger(JdeJdbcProperties.class);
    private static final int MAX_WAIT = 10000;
    private static final int VALIDATION_INTERVAL = 30000;
    private static final int TIME_BETWEEN_EVICTION_RUNS_MILLIS = 60000;

    public void setMaxActive(int maxActive) {
        super.setMaxActive(maxActive);
        this.setInitialSize(maxActive / 10);
        this.setMinIdle(this.getInitialSize());
        this.setMaxIdle(maxActive / 2);
    }

    public JdeJdbcProperties() {
        this.setJmxEnabled(false);
        this.setDefaultAutoCommit(false);
        this.setMaxWait(10000);
        this.setValidationQuery(SqlUtil.validationQuery());
        this.setValidationInterval(30000L);
        this.setTestOnConnect(true);
        this.setTestOnBorrow(true);
        this.setTestWhileIdle(true);
        this.setTimeBetweenEvictionRunsMillis(60000);
        this.setRemoveAbandoned(true);
        this.setLogAbandoned(true);
        this.setJdbcInterceptors("ConnectionState;StatementFinalizer");
    }

    public String toString() {
        return "JdbcConfig{driverClassName=" + this.getDriverClassName() + ", url=" + this.getUrl() + ", username=" + this.getUsername() + ", password=[PASSWORD], maxActive=" + this.getMaxActive() + ", initialSize=" + this.getInitialSize() + ", minIdle=" + this.getMinIdle() + ", maxIdle=" + this.getMaxIdle() + '}';
    }
}
