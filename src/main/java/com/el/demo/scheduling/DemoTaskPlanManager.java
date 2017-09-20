package com.el.demo.scheduling;

import com.el.core.scheduling.TaskPlan;
import com.el.core.scheduling.TaskPlanManager;
import org.springframework.beans.factory.annotation.Value;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author neo.pan
 * @since 16/11/16
 */
public class DemoTaskPlanManager extends TaskPlanManager {

    @Value("${webApp.sched}")
    private boolean autoStart;

    @Override
    protected boolean autoStart() {
        return autoStart;
    }

    @Override
    protected Set<TaskPlan> taskPlans() {
        return Stream.of(
                TaskPlan.of("demoPlan1", DemoTask1.class.getName(), "*/5 * * * * *"),
                TaskPlan.of("demoPlan2", DemoTask2.class.getName(), "*/10 * * * * *"))
                .collect(Collectors.toSet());
    }

}
