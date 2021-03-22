
<template>
	<div>
		👋
		<br />
		<!-- <button @click="startMedia">startMedia</button> -->
		{{ $store.inited }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Greeter',
	mounted() {
		console.log('Greeter mounted');
		this.startMedia();
		// browser.runtime.sendMessage({});
	},
	methods: {
		startMedia() {
			console.log('startMedia');

			// only weird thing is it looks like X current site wants your media since its the frontend asking
			navigator.mediaDevices.getUserMedia({ audio: true, video: true })
				.then((mediaStream) => {
				//in promise will be triggered user permission request
					console.log('ms', mediaStream);

				})
				.catch((e) => {
					//manage error
					console.error(e);

				});
		}
	}
});
</script>

<style scoped>
</style>
