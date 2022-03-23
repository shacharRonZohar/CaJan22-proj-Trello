<template>
    <header class="main-header home-header flex space-between align-center">
        <div class="logo">Twello</div>

        <nav>
            <div class="home-nav">
                <ul class="clean-list flex">
                    <li>
                        <router-link to="/login" class="login-link">Log in</router-link> |  
                    </li>
                    <li>
                        | <router-link to="/signup" class="signup-board">Sing up</router-link>
                    </li>
                </ul>
            </div>
        </nav>

    </header>
</template>