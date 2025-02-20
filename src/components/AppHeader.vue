<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{name: 'contactbook'}" class="nav-link">
                    Danh bạ <i class="fas fa-address-book"/>
                </router-link>
            </li>
        </div>
    </nav>
</template>