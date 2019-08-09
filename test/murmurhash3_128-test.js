/*
 * Copyright 2013 Aggregate Knowledge, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Unit and data tests for murmurhash3_128.js

// *****************************************************************************
// canned data (processed via the Guava Java (Murmur3_128HashFunction) version)
// for sanity. The Java calls are provided for reference.
test("murmur3.hash128", function() {
    // .. empty ................................................................
    // Java (Guava):
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(0);
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("0")).equals(hashed));
    })();
    (function() {
        var hashed = murmur3.hash128(/*no parameters = use defaults*/);
        ok((new goog.math.Long.fromString("0")).equals(hashed));
    })();

    // .. byte .................................................................
    // Java (Guava):
    //    final int seed = 0;
    //    final byte[] bytes = { (byte)0x00 };
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(1);
            var byteView = new Int8Array(rawKey);
                byteView[0] = 0x00;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("5048724184180415669")).equals(hashed));
    })();
    // Java (Guava):
    //    final int seed = 0;
    //    final byte[] bytes = { (byte)0xDE };
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(1);
            var byteView = new Int8Array(rawKey);
                byteView[0] = 0xDE/*'signed'*/;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("839819032933588501")).equals(hashed));
    })();

    // .. int ..................................................................
    // Java (Guava):
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putInt(0xDE)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(4);
            var intView = new Int32Array(rawKey);
                intView[0] = 0xDE;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("-3146645291160985385")).equals(hashed));
    })();
    // Java (Guava):
    //    final int seed = 0;
    //    final byte[] bytes = { (byte)0xDE, (byte)0x00, (byte)0x00, (byte)0x00 };
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(4);
            var byteView = new Int8Array(rawKey);
                byteView[0] = 0xDE/*'signed'*/;
                byteView[1] = 0x00;
                byteView[2] = 0x00;
                byteView[3] = 0x00;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("-3146645291160985385")).equals(hashed));
    })();

    // .. int ..................................................................
    // Java (Guava):
    //    final int seed = 0;
    //    final byte[] bytes = { (byte)0xDE, (byte)0xAD, (byte)0xBE, (byte)0xEF };
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(4);
            var byteView = new Int8Array(rawKey);
                byteView[0] = 0xDE;
                byteView[1] = 0xAD;
                byteView[2] = 0xBE;
                byteView[3] = 0xEF;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("6487796989963411242")).equals(hashed));
    })();
    // Java (Guava):
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putInt(0xEFBEADDE/*little endian*/)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(4);
            var intView = new Int32Array(rawKey);
                intView[0] = 0xEFBEADDE/*little endian*/;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("6487796989963411242")).equals(hashed));
    })();
    // Java (Guava):
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putInt(0xDEADBEEF/*big endian*/)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(4);
            var intView = new Int32Array(rawKey);
                intView[0] = 0xDEADBEEF/*big endian*/;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("8603483835171163158")).equals(hashed));
    })();

    // .. long .................................................................
    // Java (Guava):
    //    final int seed = 0;
    //    final byte[] bytes = { (byte)0xDE, (byte)0xAD, (byte)0xBE, (byte)0xEF,
    //                           (byte)0xFE, (byte)0xED, (byte)0xFA, (byte)0xCE };
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(8);
            var byteView = new Int8Array(rawKey);
                byteView[0] = 0xDE; byteView[1] = 0xAD; byteView[2] = 0xBE; byteView[3] = 0xEF;
                byteView[4] = 0xFE; byteView[5] = 0xED; byteView[6] = 0xFA; byteView[7] = 0xCE;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("-4440616832553550142")).equals(hashed));
    })();
    // Java (Guava):
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putInt(0xEFBEADDE/*little endian*/)
    //           .putInt(0xCEFAEDFE/*little endian*/)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    // Equivalent to:
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putLong(0xCEFAEDFEEFBEADDEL/*little endian*/)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(8);
            var intView = new Int32Array(rawKey);
                intView[0] = 0xEFBEADDE/*little endian*/;
                intView[1] = 0xCEFAEDFE/*little endian*/;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("-4440616832553550142")).equals(hashed));
    })();
    // Java (Guava):
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putInt(0xDEADBEEF/*big endian*/)
    //           .putInt(0xFEEDFACE/*big endian*/)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    // Equivalent to:
    //    final int seed = 0;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putLong(0xFEEDFACEDEADBEEFL/*big endian*/)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(8);
            var intView = new Int32Array(rawKey);
                intView[0] = 0xDEADBEEF/*big endian*/;
                intView[1] = 0xFEEDFACE/*big endian*/;
        var hashed = murmur3.hash128(rawKey, seed);
        ok((new goog.math.Long.fromString("8782020912388259033")).equals(hashed));
    })();

    // .. enough bytes to test blocking ........................................
    // NOTE:  blocking occurs where there are at least 16 bytes
    // NOTE:  an odd number of bytes are tested (>16) so that both blocking and
    //        the remainder code paths are exercised
    // Java (Guava):
    //    final int seed = 0;
    //    final byte[] bytes = { (byte)0x01, (byte)0x02, (byte)0x03, (byte)0x04,
    //                           (byte)0x05, (byte)0x06, (byte)0x07, (byte)0x08,
    //                           (byte)0x09, (byte)0x0A, (byte)0x0B, (byte)0x0C,
    //                           (byte)0x0D, (byte)0x0E, (byte)0x0F, (byte)0x10,
    //                           (byte)0x11, (byte)0x12, (byte)0x13, (byte)0x14,
    //                           (byte)0x15, (byte)0x16, (byte)0x17, (byte)0x18,
    //                           (byte)0x19, (byte)0x1A, (byte)0x1B, (byte)0x1C,
    //                           (byte)0x1D, (byte)0x1E, (byte)0x1F, (byte)0x20,
    //                           (byte)0x21 }/*odd number of bytes*/;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 0;
        var rawKey = new ArrayBuffer(33);
            var byteView = new Int8Array(rawKey);
                byteView[ 0] = 0x01; byteView[ 1] = 0x02; byteView[ 2] = 0x03; byteView[ 3] = 0x04;
                byteView[ 4] = 0x05; byteView[ 5] = 0x06; byteView[ 6] = 0x07; byteView[ 7] = 0x08;
                byteView[ 8] = 0x09; byteView[ 9] = 0x0A; byteView[10] = 0x0B; byteView[11] = 0x0C;
                byteView[12] = 0x0D; byteView[13] = 0x0E; byteView[14] = 0x0F; byteView[15] = 0x10;
                byteView[16] = 0x11; byteView[17] = 0x12; byteView[18] = 0x13; byteView[19] = 0x14;
                byteView[20] = 0x15; byteView[21] = 0x16; byteView[22] = 0x17; byteView[23] = 0x18;
                byteView[24] = 0x19; byteView[25] = 0x1A; byteView[26] = 0x1B; byteView[27] = 0x1C;
                byteView[28] = 0x1D; byteView[29] = 0x1E; byteView[30] = 0x1F; byteView[31] = 0x20;
                byteView[32] = 0x21;
        var hashed = murmur3.hash128(rawKey, seed);
        console.log(hashed.toString(10))
        ok((new goog.math.Long.fromString("-7031486286803411836")).equals(hashed));
        ///ok((new goog.math.Long.fromString("863881327554208428")).equals(hashed));
    })();

    // non-zero seed (for sanity)
    // Java (Guava):
    //    final int seed = 1234567;
    //    final byte[] bytes = { (byte)0x01, (byte)0x02, (byte)0x03, (byte)0x04,
    //                           (byte)0x05, (byte)0x06, (byte)0x07, (byte)0x08,
    //                           (byte)0x09, (byte)0x0A, (byte)0x0B, (byte)0x0C,
    //                           (byte)0x0D, (byte)0x0E, (byte)0x0F, (byte)0x10,
    //                           (byte)0x11, (byte)0x12, (byte)0x13, (byte)0x14,
    //                           (byte)0x15, (byte)0x16, (byte)0x17, (byte)0x18,
    //                           (byte)0x19, (byte)0x1A, (byte)0x1B, (byte)0x1C,
    //                           (byte)0x1D, (byte)0x1E, (byte)0x1F, (byte)0x20,
    //                           (byte)0x21 }/*odd number of bytes*/;
    //    com.google.common.hash.HashFunction hashFunction = com.google.common.hash.Hashing.murmur3_128(seed);
    //    com.google.common.hash.HashCode hashCode = hashFunction.newHasher()
    //           .putBytes(bytes)
    //           .hash();
    //    System.err.println(hashCode.asLong());
    (function() {
        var seed = 1234567;
        var rawKey = new ArrayBuffer(33);
            var byteView = new Int8Array(rawKey);
                byteView[ 0] = 0x01; byteView[ 1] = 0x02; byteView[ 2] = 0x03; byteView[ 3] = 0x04;
                byteView[ 4] = 0x05; byteView[ 5] = 0x06; byteView[ 6] = 0x07; byteView[ 7] = 0x08;
                byteView[ 8] = 0x09; byteView[ 9] = 0x0A; byteView[10] = 0x0B; byteView[11] = 0x0C;
                byteView[12] = 0x0D; byteView[13] = 0x0E; byteView[14] = 0x0F; byteView[15] = 0x10;
                byteView[16] = 0x11; byteView[17] = 0x12; byteView[18] = 0x13; byteView[19] = 0x14;
                byteView[20] = 0x15; byteView[21] = 0x16; byteView[22] = 0x17; byteView[23] = 0x18;
                byteView[24] = 0x19; byteView[25] = 0x1A; byteView[26] = 0x1B; byteView[27] = 0x1C;
                byteView[28] = 0x1D; byteView[29] = 0x1E; byteView[30] = 0x1F; byteView[31] = 0x20;
                byteView[32] = 0x21;
        var hashed = murmur3.hash128(rawKey, seed);
        console.log(hashed.toString(10))
        ok((new goog.math.Long.fromString("863881327554208428")).equals(hashed));
    })();

    //// Same as above, but with seed 0x123456
    (function() {
        var seed = 0x123456
        var rawKey = new ArrayBuffer(33);
            var byteView = new Int8Array(rawKey);
                byteView[ 0] = 0x01; byteView[ 1] = 0x02; byteView[ 2] = 0x03; byteView[ 3] = 0x04;
                byteView[ 4] = 0x05; byteView[ 5] = 0x06; byteView[ 6] = 0x07; byteView[ 7] = 0x08;
                byteView[ 8] = 0x09; byteView[ 9] = 0x0A; byteView[10] = 0x0B; byteView[11] = 0x0C;
                byteView[12] = 0x0D; byteView[13] = 0x0E; byteView[14] = 0x0F; byteView[15] = 0x10;
                byteView[16] = 0x11; byteView[17] = 0x12; byteView[18] = 0x13; byteView[19] = 0x14;
                byteView[20] = 0x15; byteView[21] = 0x16; byteView[22] = 0x17; byteView[23] = 0x18;
                byteView[24] = 0x19; byteView[25] = 0x1A; byteView[26] = 0x1B; byteView[27] = 0x1C;
                byteView[28] = 0x1D; byteView[29] = 0x1E; byteView[30] = 0x1F; byteView[31] = 0x20;
                byteView[32] = 0x21;
        var hashed = murmur3.hash128(rawKey, seed);
        console.log(hashed.toString(10))
        ok((new goog.math.Long.fromString("-1994940764045872751")).equals(hashed));
    })();

    (function() {
        var seed = 0x123456
        var rawKey = new ArrayBuffer(13);
        ///val hexBytes = Array[Byte](  0x42.toByte , 0x6f.toByte , 0x6f.toByte ,
       ///0x67.toByte , 0x65.toByte , 0x72.toByte , 0x6c.toByte , 0x69.toByte ,
      ///0x63.toByte , 0x69.toByte , 0x6f.toByte , 0x75.toByte , 0x73.toByte)

            var byteView = new Int8Array(rawKey);
                byteView[ 0] = 0x42; byteView[ 1] = 0x6f; byteView[ 2] = 0x6f; byteView[ 3] = 0x67;
                byteView[ 4] = 0x65; byteView[ 5] = 0x72; byteView[ 6] = 0x6c; byteView[ 7] = 0x69;
                byteView[ 8] = 0x63; byteView[ 9] = 0x69; byteView[10] = 0x6f; byteView[11] = 0x75;
                byteView[12] = 0x73;
        var hashed = murmur3.hash128(rawKey, seed);
        console.log(hashed.toString(10))
        ok((new goog.math.Long.fromString("-675189066567607313")).equals(hashed));
    })();

});

test("Additional cases", function() {
   (function(assert) {
   var boogerBytes = string2bytes("Boogerlicious")
   console.log(boogerBytes)
   ok(boogerBytes.length == 13)

   var boogerHash = murmur3.hash128(boogerBytes, 0x123456)
   console.log( "BOOGER HASH = " + boogerHash.toString(10))
   ok(( new goog.math.Long.fromString("-675189066567607313")).equals(boogerHash));
 })();

/**
(function(assert) {

//// Add String2bytes , to compare strings easily
var gettysburg = "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.\n\nNow we are engaged in a great civil war, testing whether that nation, or any nation so conceived and dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.\n\nBut, in a larger sense, we can not dedicate — we can not consecrate — we can not hallow — this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us — that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion — that we here highly resolve that these dead shall not have died in vain — that this nation, under God, shall have a new birth of freedom — and that government of the people, by the people, for the people, shall not perish from the earth"

   var lincolnBytes = hllBH.string2bytes(gettysburg)
   console.log(lincolnBytes)

   var lincolnHash = murmur3.hash128(lincolnBytes, 0x123456)
   console.log( "Lincoln HASH = " + lincolnHash.toString(10))
   console.log( " Lincoln length " + gettysburg.length)
   equal( gettysburg.length, 1464)
   ok(( new goog.math.Long.fromString("8203366682652282570")).equals(lincolnHash));
 })();
 **/

})


test("Failing cases", (function() {
   (function(assert) {
        var seed = 0;
        var rawKey = new ArrayBuffer(33);
            var byteView = new Int8Array(rawKey);
                byteView[ 0] = 0x01; byteView[ 1] = 0x02; byteView[ 2] = 0x03; byteView[ 3] = 0x04;
                byteView[ 4] = 0x05; byteView[ 5] = 0x06; byteView[ 6] = 0x07; byteView[ 7] = 0x08;
                byteView[ 8] = 0x09; byteView[ 9] = 0x0A; byteView[10] = 0x0B; byteView[11] = 0x0C;
                byteView[12] = 0x0D; byteView[13] = 0x0E; byteView[14] = 0x0F; byteView[15] = 0x10;
                byteView[16] = 0x11; byteView[17] = 0x12; byteView[18] = 0x13; byteView[19] = 0x14;
                byteView[20] = 0x15; byteView[21] = 0x16; byteView[22] = 0x17; byteView[23] = 0x18;
                byteView[24] = 0x19; byteView[25] = 0x1A; byteView[26] = 0x1B; byteView[27] = 0x1C;
                byteView[28] = 0x1D; byteView[29] = 0x1E; byteView[30] = 0x1F; byteView[31] = 0x20;
                byteView[32] = 0x21;
        var hashed = murmur3.hash128(rawKey, seed);
        console.log(hashed.toString(10))
        ok((new goog.math.Long.fromString("-7031486286803411836")).equals(hashed));
        ///ok((new goog.math.Long.fromString("863881327554208428")).equals(hashed));
 })();

} ));

//==============================================================================
// file-based data

///asyncTest("murmur3.hash128", function() {
    ///d3.text("data/murmur_bigint.csv", function(error, text) {
        ///if(error)
            ///ok(false/*failed*/, error);
        ///else /*no error*/
            ///assertHash128(text);
///
        ///start()/*allow qunit to continue*/;
    ///});
///});


function hashForString(seed,str) {
  var bytes = string2bytes(str)

  var hash = murmur3.hash128(bytes, seed)
  console.log( "HASH of " + str + "  = " + hash.toString(10))

  return hash.toString(10);
}

// -----------------------------------------------------------------------------
// parses and asserts that the parsed seed and value matches that of the
// {@link #hash128() hashed} result
function assertHash128(text) {
    var csv = text.split("\n");
        csv = csv.map(function(line) { return line.split(","); });
    for(var i=1/*skip the file header*/; i<csv.length; i++) {
        var line = csv[i];

        // disregard any lines with incorrect numbers of elements
        if(line.length != 3) {
            ok(false, "Warning: expected 3 columns, found: " + line.length + " on line " + i + ".");
            continue/*disregard*/;
        } /* else -- there are exactly three columns as expected */

        var seed = parseInt(line[0/*seed*/]),
            raw = goog.math.Long.fromString(line[1/*pre-hash*/]),
            expectedHashed = goog.math.Long.fromString(line[2/*post-hash-long*/]);
        var rawKey = new ArrayBuffer(8);
            var intView = new Uint32Array(rawKey);
                intView[0] = raw.low_;
                intView[1] = raw.high_;
        var actualHashed = murmur3.hash128(rawKey, seed);
        ok(expectedHashed.equals(actualHashed));
    }
}

function string2bytes(item) {
  //const bytes = new TextEncoder().encode(item);
  ///return bytes
  var sumBytes = 0;
  for(var i=0; i<item.length; ++i) {
   var checkChar = item.charCodeAt(i);
   if(checkChar >= 256) {
     sumBytes += 2;
   } else {
     sumBytes += 1;
   }
 }

  var byteBuffer = new Uint8Array(sumBytes);
 var ctr =  0;
 for(var i=0; i<item.length; ++i) {
   var checkChar = item.charCodeAt(i);
   if(checkChar >= 256) {
     byteBuffer[ctr++] = checkChar >> 8;
     byteBuffer[ctr++] = checkChar & 0xFF;
   } else {
     ///console.log(" ADDING CHAR " + checkChar + " AT POS " + ctr)
     byteBuffer[ctr++] = checkChar;
   }
 }
 return  byteBuffer;
}
