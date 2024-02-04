const BRO = globalThis.browser || globalThis.chrome;

const $textarea = document.querySelector('textarea[name="cssVars"]');
const DEFAULT_CSSVARS = `
--ytfs-play-progress-bg: rgb(0, 239, 255);
--ytfs-scrubber-button: rgb(0, 239, 255);

--ytfs-caption-opacity: .9;
--ytfs-caption-window-text-shadow: 1px 1px 5px black, 1px 1px 5px black, 1px 1px 5px black, 1px 1px 5px black, 1px 1px 5px black;
--ytfs-caption-window-bg: none !important;
--ytfs-caption-segment: rgba(0,0,0,.4);
--ytfs-caption-segment-border-radius: 5px;
`;

init();
document.querySelector('button[name="save"]').addEventListener('click', handleSave);
document.querySelector('button[name="reset"]').addEventListener('click', handleReset);

async function init () {
    const { cssVars = DEFAULT_CSSVARS } = await BRO.storage.local.get(['cssVars']);
    $textarea.value = cssVars;
}

function handleSave (e) {
    BRO.storage.local.set({ 'cssVars': $textarea.value });
}

function handleReset () {
    BRO.storage.local.remove(['cssVars']);
    $textarea.value = DEFAULT_CSSVARS;
}