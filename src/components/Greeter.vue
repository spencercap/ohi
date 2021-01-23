
<template>
	<div>
		👋
		<br />
		{{ $store.inited }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Greeter',
	mounted() {
		console.log('Greeter mounted');
		// browser.runtime.sendMessage({});
	}
});
</script>

<style scoped>
</style>
