# towerofhanoi

Applet that solves Tower of Hanoi using the recursive solution. The fundamental algorithm breaks the puzzle into smaller steps, moving n-1 disks the the peg that is NOT the destination for all n disks, then moving the largest disk to the destination, then finally moving the n-1 disks to the destination. The n-1 size problem is the essentially the same as the n size problem, as the largest disks will not affect any moves if they are on the bottom.

I am pretty sure that this recursive algorithm which runs at O(2^n) time is as efficient as possible, because you must make all of the recursive steps in order to satisfy the rules of the game.
