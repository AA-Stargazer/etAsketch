from PIL import Image
import numpy as np
im = Image.open('top-line-with-transparency.ico')


# while I was searching for how to get the alpha value, https://stackoverflow.com/questions/35965487/indexerror-with-pil-image-and-numpy-array-alpha-channel-blending
# I couldn't find just from the documentation yet.... But what I want to do was simple thing in the end, anyway... (yet this convert also in the page I was in documentation -_- )
orig_img = np.array(im.convert('RGBA'))
# so we will need the alpha value as int between 0-255

print(orig_img)






# -----------------------------------------
# red, green, blue, alpha = im.split()
# print(alpha)


# -----------------------------------------
# a = np.asarray(im)
# 
# # print(a)
# for i in a[2:]:
#     for k in i:
#         print(k)
#     break
