export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useSupabaseUser();
    const isLoginPage = to.name === 'login' || to.path === '/login';

    if (user.value !== null && isLoginPage) {
        return navigateTo('/');
    }


})