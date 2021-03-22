<template>
	frontend:

	<greeter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue';
import Greeter from '@/components/Greeter.vue';

import { auth } from '@/firebase';

export default defineComponent({
	name: 'App',
	components: {
		// HelloWorld,
		Greeter
	},
	data() {
		return {
			// inc: 0
		};
	},
	mounted() {
		console.log('App mounted');

		// auth
		auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				await this.$store.init(authUser.uid);
			} else {
				this.$store.destroy();
			}
		});
		// TODO move this to backend so SAME uid is tied to multiple tabs?
		auth.signInAnonymously();
	}
});
</script>

<style>
#ohi-app {
	position: fixed;
	right: 0;
	bottom: 0;
	z-index: 99999;
}
</style>