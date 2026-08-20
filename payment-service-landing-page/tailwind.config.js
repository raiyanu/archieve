module.exports = {
    theme: {
        extend: {
            animation: {
                'smooth-up-down': 'smoothUpDown 2s ease-in-out infinite',
                'smooth-up-down-1': 'smoothUpDown-1 var(--d) ease-in-out infinite',
                'smooth-up-down-2': 'smoothUpDown-2 var(--d) ease-in-out infinite',
                'smooth-up-down-3': 'smoothUpDown-3 var(--d) ease-in-out infinite',
                'smooth-rotate': 'smoothRotate 2s ease-in-out infinite',
                'smooth-push-up-down': 'smoothPushUpDown 2s ease-in-out infinite',
            },
            keyframes: {
                'smoothUpDown': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
                'smoothUpDown-1': {
                    '0%, 100%': {
                        translate: ' 0 0',
                    },
                    '50%': {
                        translate: ' 0 -20px',
                    },
                },
                'smoothUpDown-2': {
                    '0%, 100%': {
                        translate: ' 0 0',
                    },
                    '50%': {
                        translate: ' 0 -40px',
                    },
                },
                'smoothUpDown-3': {
                    '0%, 100%': {
                        translate: ' 0 0',
                    },
                    '50%': {
                        translate: ' 0 -60px',
                    },
                },
                'smoothRotate': {
                    '0%, 100%': {
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        transform: 'rotate(360deg)',
                    },
                },
                smoothPushUpDown: {
                    '0%, 100%': {
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        transform: 'rotate(360deg)',
                    },
                },
            },
            backgroundImage: {
                spiral: "url('assets/spiral.svg')",
            },
            content: {
                ball: "url('assets/boll.svg')",
            },
            colors: {
                primary: "#00040F",
                secondary: "#5CE1E6",
            },
            cursor: {
                customFancy: "url('https://127.0.0.1:5500/cursor.cur'), url('https://s141.convertio.me/p/zro487NW-h8aBzAlEK1Wlg/a89a9d40dc37f1ff277f2590ceda943d/cursor.cur'), auto ",
            }
        },
    },
}
