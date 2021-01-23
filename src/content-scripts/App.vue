<template>
	frontend:
	<hello-world />

	<button @click="inc++">{{ inc }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
	name: 'App',
	components: { HelloWorld },
	data() {
		return {
			inc: 0
		};
	}
});
</script>

<style>
#ohi-app {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 99999;
}
</style>