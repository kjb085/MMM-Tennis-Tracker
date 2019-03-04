Module.registerVue('MMM-TennisTracker', {

    data: {
        // Currently storing this inside data for access post creation of Vue object
        // required in order to delay $mount()
        // @TODO - Move this out of data like standard Vue.js
        el: '#mmm-tennis-tracker',
        defaults: {
        	width: '50vw',
            displayCount: 1,
            players: ['Rafael Nadal'],
    	},
        // Currently using test data
        displayedMatches: [
            {
                tournament: 'US Open',
                date: '2019-09-01',
                isComplete: true,
                isLive: false,
                playerScores: [
                    {
                        isWinner: true,
                        player: 'Rafael Nadal',
                        sets: [
                            7,
                            6,
                            6,
                        ],
                    },
                    {
                        isWinner: false,
                        player: 'Roger Federer',
                        sets: [
                            6,
                            0,
                            0,
                        ],
                    }
                ],
            }
        ],
        matches: {
            completed: [],
            inProgress: [],
            upcoming: [],
        },
        loading: true,
        html: null,
    },

    components: {
        match: {
            template: '#match-template',
            props: ['match'],
            methods: {
                isTiebreaker: function (score) {
                    return Array.isArray(score);
                },
            }
        },
    },

    mounted: function () {
        // Currently leaving for testing purposes
        this.loading = false;
    },

    methods: {
        getStyles: function () {
            return [
                this.file('assets/style.css'),
            ];
        },
        start: function () {
            Log.info(`Starting module: ${this.name}`);

            this.initializeUpdate();
        },
        initializeUpdate: function () {
            this.sendSocketNotification('TENNIS_TRACKER_CONFIG', { config: this.config });
        },
        socketNotificationReceived: function (notification, payload) {
            console.log(payload);

            if (notification === "TENNIS_TRACKER_TEMPLATE") {
                this.html = payload.html;
            } else if (notification === "TENNIS_TRACKER_DATA") {
                this.loading = false;
                this.matches = payload.matches;
            } else if (notification === "TENNIS_TRACKER_ERROR") {
                console.log(payload.error);
            }
        },
        getDom: function  () {
            var wrapper = document.createElement('div');
            console.log('getting dom');

            // Circumvent rebuilding of the DOM post mount
            // @TODO - Add this to the framework so devs won't need to handle this case
            //         Maybe handle entire getDom and block it from being set by module
            if (this._isMounted) {
                return;
            } else if (this.html) {
                wrapper.innerHTML = this.html;
            } else {
                wrapper.innerHTML = '<h2>LOADING...</h2>';
            }

            return wrapper;
        },
    }
});
