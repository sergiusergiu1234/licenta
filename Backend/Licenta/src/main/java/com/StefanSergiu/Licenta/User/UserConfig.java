package com.StefanSergiu.Licenta.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Configuration
public class UserConfig {
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
  @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){

      return args -> {
          User admin=new User(
                  "admin",
                  "admin",
                  "sergiuc.stefan@gmail.com",
                  "password",
                  Role.ADMIN
          );

          Optional<User> existingAdminEmail = repository.findUserByEmail(admin.getEmail());
          if(existingAdminEmail.isEmpty()){
              String encodedPassword = bCryptPasswordEncoder.encode(admin.getPassword());
              admin.setPassword(encodedPassword);
            repository.save(admin);
          }

      };
  }
}
