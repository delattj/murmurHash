
_rshift = lambda v, n: (v % 0x100000000) >> n
_rot32 = lambda x, y: ((x << y) | _rshift(x, (32 - y)))
_multiply = lambda m, n: ((m & 0xffff) * n) + (((_rshift(m, 16) * n) & 0xffff) << 16)

def hash_v3_32(key, seed=0):
	key = bytearray(key)
	l_key = len(key)
	
	remainder = l_key % 4
	l_bytes = l_key - remainder
	
	h1 = seed
	k1 = 0
	
	for i in xrange(0, l_bytes, 4):
		k1 = ((key[i] & 0xff))\
				| ((key[i + 1] & 0xff) << 8)\
				| ((key[i + 2] & 0xff) << 16)\
				| ((key[i + 3] & 0xff) << 24)
		
		k1 = _multiply(k1, 0xcc9e2d51)
		k1 = _rot32(k1, 15)
		k1 = _multiply(k1, 0x1b873593)
		h1 ^= k1

		h1 = _rot32(h1, 13)
		h1 = _multiply(h1, 5) + 0xe6546b64
	
	i = l_key - remainder
	k1 = 0
	if remainder > 2:
		k1 ^= (key[i + 2] & 0xff) << 16
		
	if remainder > 1:
		k1 ^= (key[i + 1] & 0xff) << 8
		
	if remainder > 0:
		k1 ^= (key[i] & 0xff)

		k1 = _multiply(k1, 0xcc9e2d51)
		k1 = _rot32(k1, 15)
		k1 = _multiply(k1, 0x1b873593)
		h1 ^= k1
	
	h1 ^= l_key
	h1 ^= _rshift(h1, 16)
	h1  = _multiply(h1, 0x85ebca6b)
	h1 ^= _rshift(h1, 13)
	h1  = _multiply(h1, 0xc2b2ae35)
	h1 ^= _rshift(h1, 16)

	return _rshift(h1, 0)
