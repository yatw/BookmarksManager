
USE heroku_af4745ddf02c336;

# match all tag rather than many 
# https://stackoverflow.com/questions/24519215/mysql-match-all-tags-rather-than-any

# order matter, the below dont work
SELECT *
FROM linkTag

INNER JOIN links l1 ON l1.linkId = linkTag.link
INNER JOIN tags t1 ON t1.tagId = linkTag.tag
AND t1.name = 'youtube'

INNER JOIN links l2 ON l2.linkId = linkTag.link
INNER JOIN tags t2 ON t2.tagId = linkTag.tag
AND t2.name = 'music'
;

# this one work
SELECT *
FROM links

INNER JOIN linkTag lt0 ON links.linkId = lt0.link
INNER JOIN tags t0 ON t0.tagId = lt0.tag
AND t0.name = 'youtube'

INNER JOIN linkTag lt1 ON links.linkId = lt1.link
INNER JOIN tags t1 ON t1.tagId = lt1.tag
AND t1.name = 'music'
;
