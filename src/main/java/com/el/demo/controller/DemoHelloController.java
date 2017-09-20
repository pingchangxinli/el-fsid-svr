package com.el.demo.controller;

import com.el.core.domain.CoreOp;
import com.el.core.web.WebUtil;
import lombok.val;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 * @author neo.pan
 * @since 17/4/19
 */
@Profile("demo")
@RestController
@RequestMapping("/demo")
public class DemoHelloController {

    @GetMapping("/")
    public Object outputJson(HttpServletRequest request) {
        val ctxPath = request.getContextPath();
        val links = new HashMap<String, String>();
        links.put("dp", ctxPath.concat("/demo/dp"));
        links.put("tx", ctxPath.concat("/demo/tx"));
        return links;
    }

    @PostMapping("/op/status")
    public void outputStatus(HttpServletResponse response) {
        WebUtil.outputStatus(response, HttpStatus.OK);
    }

    @PostMapping("/op/result")
    public void outputResult(HttpServletResponse response) {
        WebUtil.outputResult(response, CoreOp.OK);
    }

}
