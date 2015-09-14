Trio.Module.import({
    'clockComponent': './src/common/components/clock/clock.js',
    'logoComponent': './src/common/components/logo/logo.js',
    'iconComponent': './src/common/components/icon/icon.js',
    'moduleComponent': './src/common/components/module/module.js'
})

.and.export('components', function(ret) {
    return ret;
});