package com.el.demo.controller;

import com.el.demo.auth.DemoAuthPrincipalProvider;
import com.el.demo.messaging.DemoEventUser;
import com.el.demo.messaging.DemoMailAddressProvider;
import com.el.demo.messaging.DemoPostman;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Profile("demo")
@RestController
@RequestMapping("/demo")
public class DemoPostmanController {

    @Autowired
    private DemoPostman postman;

    @Autowired
    private DemoMailAddressProvider mailAddressProvider;

    @Autowired
    private DemoAuthPrincipalProvider authPrincipalProvider;

    @PostMapping("/pm/msg")
    @ResponseStatus(HttpStatus.OK)
    public void sendMsg(@RequestBody DemoMsg msg) {
        if (!msg.isValid()) return;
        val sender = DemoEventUser.userOf(
                authPrincipalProvider.getPrincipal().getId());
        List<DemoEventUser> targets = targetsOf(msg);
        postman.sendMessage(postman.newEventMessage(
                msg.getMsg(), sender, targets));
    }

    @PostMapping("/pm/todo")
    @ResponseStatus(HttpStatus.OK)
    public void sendTodo(@RequestBody DemoMsg msg) {
        if (!msg.isValid()) return;
        postman.sendMessage(postman.newTodoMessage(null, targetsOf(msg)));
    }

    @PostMapping("/pm/mail")
    @ResponseStatus(HttpStatus.OK)
    public void sendMail(@RequestBody DemoMsg msg) {
        if (!msg.isValid()) return;
        mailAddressProvider.setMailAddressResolver(u -> msg.getMail());
        postman.sendMessage(postman.newMailMessage(msg.getMsg(), targetsOf(msg)));
    }

    private List<DemoEventUser> targetsOf(@RequestBody DemoMsg msg) {
        return msg.getTargets().stream()
                .map(DemoEventUser::userOf)
                .collect(Collectors.toList());
    }

}
