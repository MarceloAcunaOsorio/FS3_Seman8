package com.nuevo.proyecto.Service;

import org.springframework.http.HttpHeaders;

import com.nuevo.proyecto.dto.JwtResponseDto;
import com.nuevo.proyecto.dto.LoginDto;
import com.nuevo.proyecto.dto.RegisterDto;
import com.nuevo.proyecto.dto.UserDto;

public interface  UserService {
    
    public UserDto register(RegisterDto registerDto);
    public JwtResponseDto login(LoginDto loginDto);
    UserDto getLoguedUser(HttpHeaders headers);
}
