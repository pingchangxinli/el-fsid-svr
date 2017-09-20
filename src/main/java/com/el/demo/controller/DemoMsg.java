package com.el.demo.controller;

import lombok.Data;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Data
public class DemoMsg {
    private String msg;
    private String mail;
    private List<Integer> targets;

    public boolean isValid() {
        return !targets.isEmpty();
    }
}
