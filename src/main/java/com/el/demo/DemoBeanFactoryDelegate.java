package com.el.demo;

import com.el.core.BeanFactoryDelegate;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

/**
 * @author neo.pan
 * @since 17/5/15
 */
@Component
public class DemoBeanFactoryDelegate implements BeanFactoryDelegate {
    @Override
    public Object createBean(String beanClazz, AutowireCapableBeanFactory beanFactory) throws Throwable {
        return beanFactory.createBean(Class.forName(beanClazz));
    }
}
