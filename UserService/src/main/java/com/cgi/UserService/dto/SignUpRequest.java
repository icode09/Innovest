package com.cgi.UserService.dto;


import com.cgi.UserService.validator.PasswordMatches;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@PasswordMatches
public class SignUpRequest {

    @NotEmpty
    private String displayName;

    @NotEmpty
    private String email;

    @Size(min = 6, message = "{Size.userDto.password}")
    private String password;

    @NotEmpty
    private String matchingPassword;

    public SignUpRequest(String displayName, String email, String password) {
        this.displayName = displayName;
        this.email = email;
        this.password = password;
    }


    public static Builder getBuilder() {
        return new Builder();
    }

    public static class Builder{
        private String displayName;
        private String email;
        private String password;

        public Builder addDisplayName(final String displayName) {
            this.displayName = displayName;
            return this;
        }

        public Builder addEmail(final String email) {
            this.email = email;
            return this;
        }

        public Builder addPassword(final String password) {
            this.password = password;
            return this;
        }

        public SignUpRequest build() {
            return new SignUpRequest(displayName, email, password);
        }
    }
}
