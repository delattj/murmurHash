// based on github.com/shorelabs/murmurhash-online/

(function(root)
{

function _multiply(m, n)
{
	return ((m & 0xffff) * n) + ((((m >>> 16) * n) & 0xffff) << 16);
}


function _rotl(m, n)
{
	return (m << n) | (m >>> (32 - n));
}

root.murmur = {};
root.murmur.hash_v3_32 = function(key, seed)
{
	//
	// Given a string and an optional seed as an int, returns a 32 bit hash
	//
	
	key = key || '';
	seed = seed || 0;
	
	var remainder = key.length % 4;
	var bytes = key.length - remainder;
	
	var h1 = seed;
	var k1 = 0;
	var i = 0;
	
	for (; i < bytes; i = i + 4)
	{
		k1 = ((key.charCodeAt(i) & 0xff))
			| ((key.charCodeAt(i + 1) & 0xff) << 8)
			| ((key.charCodeAt(i + 2) & 0xff) << 16)
			| ((key.charCodeAt(i + 3) & 0xff) << 24);

		k1 = _multiply(k1, 0xcc9e2d51);
		k1 = _rotl(k1, 15);
		k1 = _multiply(k1, 0x1b873593);
		h1 ^= k1;

		h1 = _rotl(h1, 13);
		h1 = _multiply(h1, 5) + 0xe6546b64;
	}
	
	k1 = 0;
	switch (remainder)
	{
		case 3:
			k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		
		case 2:
			k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		
		case 1:
			k1 ^= (key.charCodeAt(i) & 0xff);

			k1 = _multiply(k1, 0xcc9e2d51);
			k1 = _rotl(k1, 15);
			k1 = _multiply(k1, 0x1b873593);
			h1 ^= k1;
	}
	
	h1 ^= key.length;
	h1 ^= h1 >>> 16;
	h1  = _multiply(h1, 0x85ebca6b);
	h1 ^= h1 >>> 13;
	h1  = _multiply(h1, 0xc2b2ae35);
	h1 ^= h1 >>> 16;
	
	return h1 >>> 0;
};

})(this);