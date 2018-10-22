beforeAll(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000; // 60s
  console.log('before all...')
});

afterAll(function () {
  console.log('after all...')
});


beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;
          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          }
        }
      };
    }
  });

});

afterEach(function () {
  console.log('after each...' )
});





// {
//   // Spec directory path relative to the current working dir when jasmine is executed.
//   "spec_dir": "spec",
//   // Array of filepaths (and globs) relative to spec_dir to include
//   "spec_files": [
//     "**/*[sS]pec.js"
//   ],
//   // Array of filepaths (and globs) relative to spec_dir to include before jasmine specs
//   "helpers": [
//     "helpers/**/*.js"
//   ],
//   // Stop execution of a spec after the first expectation failure in it
//   "stopSpecOnExpectationFailure": true,
//   // Run specs in semi-random order
//   "random": false
// }



