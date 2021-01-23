import { reactive } from 'vue';

const store = reactive({
	// export default reactive({
	/** STATE */
	inited: false,

	/** METHODS */
	async init(uid: string): Promise<void> {
		console.log('init started:', uid);

		this.inited = true;
		console.log('init finished');
	},
	destroy(): void {
		console.log('destroy');

		this.inited = false;
	},
	async reinit(uid: string): Promise<void> {
		this.destroy();
		await this.init(uid);
	}
});
export default store;

// extend vue's "this" type
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: typeof store;
	}
}
