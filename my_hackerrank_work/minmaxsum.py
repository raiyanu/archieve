#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'miniMaxSum' function below.
#
# The function accepts INTEGER_ARRAY arr as parameter.
#

def miniMaxSum(arr):
    listsum = sum(arr);
    mini = listsum - max(arr)
    maxi = listsum - min(arr)
    print(mini,maxi)


if __name__ == '__main__':

    # arr = list(map(int, input().rstrip().split()))

    miniMaxSum([3, 4, 52, 55, 2])
