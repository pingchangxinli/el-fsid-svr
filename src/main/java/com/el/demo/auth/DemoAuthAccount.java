package com.el.demo.auth;

import com.el.core.auth.AuthAccount;
import com.el.core.auth.AuthPrincipal;
import com.el.demo.auth.DemoAuthPrincipal;
import com.el.demo.datapower.DemoDpIndices;
import lombok.Data;
import lombok.NonNull;
import lombok.ToString;
import lombok.val;

/**
 * @author neo.pan
 * @since 17/4/20
 */
@Data(staticConstructor = "of")
@ToString(exclude = {"hashedCredentials", "salt"})
public class DemoAuthAccount implements AuthAccount {

    @NonNull
    private String loginNo;

    @NonNull
    private Integer id;
    @NonNull
    private String role;

    @NonNull
    private String hashedCredentials;
    @NonNull
    private String salt;

    @NonNull
    private DemoDpIndices dpis;

    @Override
    public AuthPrincipal getPrincipal() {
        val principal = new DemoAuthPrincipal();
        principal.setId(id);
        principal.setRole(role);
        principal.setDpis(dpis);
        return principal;
    }

}
