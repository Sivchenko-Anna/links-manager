<script setup>
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

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
                <p>Login Form Placeholder</p>
            </TabPanel>
            <TabPanel value="register">
                <p>Register Form Placeholder</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>