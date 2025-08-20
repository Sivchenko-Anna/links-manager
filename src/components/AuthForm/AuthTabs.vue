<script setup>
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import LoginForm from '@/components/AuthForm/LoginForm.vue'

const activeTab = ref('login'); // login | register | reset password
</script>

<template>
    <Tabs v-model:value="activeTab">
        <TabList>
            <Tab value="login">Вход</Tab>
            <Tab value="register">Регистрация</Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="login">
                <LoginForm />
            </TabPanel>
            <TabPanel value="register">
                <p>Register Form Placeholder</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>