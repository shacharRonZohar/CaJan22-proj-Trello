<template>
    <header class="main-header home-header flex space-between align-center">
        <div class="logo flex align-center">
            <span class="logo-icon"></span>
            <span class="logo-txt">Twello</span>
        </div>

        <nav>
            <div class="home-nav">
                <ul class="clean-list flex">
                    <li>
                        <button class="login-btn">
                            <router-link to="/auth/login" class="login-link">Log in</router-link>
                        </button>
                    </li>
                    <li>
                        <button class="signup-btn">
                            <router-link to="/auth/signup" class="signup-board">Sign up</router-link>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>