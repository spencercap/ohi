import { reactive } from 'vue';

// firebase
import firebase from 'firebase/app'; // types
import { rtdb } from '@/firebase';

const store = reactive({
	// export default reactive({
	/** STATE */
	inited: false,
	uid: '',
	displayName: '',

	presenceRef: undefined as undefined | firebase.database.Reference,

	/** METHODS */
	async init(uid: string): Promise<void> {
		console.log('init started:', uid);

		if (this.inited) {
			await this.reinit(uid);
			return;
		}

		this.uid = uid;
		this.displayName = this.getLocalUsername() || 'anonymous';
		const user = {
			uid: this.uid,
			displayName: this.displayName
		};

		this.startSitePresence('test*place', user);

		this.inited = true;
		// console.log('init finished');
	},
	destroy(): void {
		console.log('destroy');

		this.uid = '';
		this.displayName = '';
		this.inited = false;
	},
	async reinit(uid: string): Promise<void> {
		this.destroy();
		await this.init(uid);
	},

	// presence
	startSitePresence(
		sitePath: string,
		user: {
			uid: string; displayName: string;
		}
	) {
		console.log('startSitePresence:', sitePath, user);
		// firebase presence how-to: https://firebase.google.com/docs/firestore/solutions/presence

		if (!sitePath || !user.uid || !rtdb) {
			console.error('not enough info for startSitePresence');
			return;
		}

		// make sure there are no weird chars in sitePath
		this.presenceRef = rtdb.ref(
			`/pages/${sitePath}/users/${user.uid}`
		);

		const userAtVenue = {
			uid: user.uid,
			displayName: user.displayName
		};

		rtdb.ref('.info/connected').on('value', async (snapshot) => {
			// If we're not currently connected, don't do anything.
			if (snapshot.val() == false) {
				return;
			}

			if (!this.presenceRef) {
				console.error('startSitePresence:', 'ref err');
				return;
			}

			try {
				// triggers if client disconnects from app (closes page, loses internet, etc) but NOT route change so thats handled by beforeDestroy + stopSitePresence
				await this.presenceRef.onDisconnect().remove();
			} catch (e) {
				console.error('startSitePresence:', 'onDisconnect err');
			}

			try {
				await this.presenceRef.set(userAtVenue); // RTDB databse, not firestore
			} catch (e) {
				console.error('startSitePresence:', 'set err');
			}
		});
	},

	// need this for what?:
	// stopSitePresence

	getLocalUsername(): string {
		const savedName = localStorage.getItem('displayName');
		if (savedName) return savedName;
		return '';

		// same same:
		// if (savedName == null || !savedName.length) {
		// 	return '';
		// }
	},
	setLocalUsername(name: string) {
		if (name && name.length) {
			localStorage.setItem('displayName', name);
		} else {
			throw 'set it to something, yeh?';
		}
	}
});
export default store;

// extend vue's "this" type
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: typeof store;
	}
}
