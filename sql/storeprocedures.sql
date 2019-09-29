USE heroku_af4745ddf02c336;

DELIMITER //
DROP PROCEDURE IF EXISTS insertLink;
CREATE PROCEDURE insertLink(IN title VARCHAR(250), IN inputURL VARCHAR(250), IN detail VARCHAR(250))
BEGIN

	INSERT INTO links SET title = title, url = inputURL, detail = detail, createdDate = CURDATE(), star = false, completed = false;
	SELECT linkId FROM links WHERE url = inputURL;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS insertLinkTagRelation;
CREATE PROCEDURE insertLinkTagRelation(IN linkId INT, IN inputTag VARCHAR(250))
BEGIN
	INSERT INTO linkTag SET link = linkId, tag= (SELECT tagId FROM tags WHERE name = inputTag);
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS updateLink;
CREATE PROCEDURE updateLink(IN inputURL VARCHAR(250), IN inputTitle VARCHAR(250), IN inputDetail VARCHAR(250), IN id INT)
BEGIN
	UPDATE links SET url = inputURL, title = inputTitle, detail = inputDetail WHERE linkId = id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS deleteLinkTagRelation;
CREATE PROCEDURE deleteLinkTagRelation(IN id INT, IN tagName VARCHAR(250))
BEGIN

    # delete 1 link tag relation in the linkTag table
	DELETE FROM linkTag WHERE link = id AND tag = (SELECT tagId FROM tags WHERE name = tagName);
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS deleteLink;
CREATE PROCEDURE deleteLink(IN id INT)
BEGIN

    SET SQL_SAFE_UPDATES=0;
	SET FOREIGN_KEY_CHECKS=0;
    
    # delete all tags relation of this link in the linkTag table
	DELETE FROM linkTag WHERE link = id;
    
    # delete the link itself
    DELETE FROM links WHERE linkId = id;

END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS getLinksCount;
CREATE PROCEDURE getLinksCount()
BEGIN
	select COUNT(*) as count FROM links;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS displayTags;
CREATE PROCEDURE displayTags()
BEGIN
	SELECT * FROM tags ORDER BY name;
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS getSelectedTags;
CREATE PROCEDURE getSelectedTags(IN linkId INT)
BEGIN
	SELECT name from 
	tags INNER JOIN linkTag on linkTag.tag = tags.tagId
	WHERE link = linkId;
END //
DELIMITER ;


# You cannot directly use a field variable inside store procedure, so use prepare statement
# I am using stored procedure here, but if you do it normally it is just
# UPDATE links SET field = true WHERE linkId = 2;
# where you concat the field as a string
DELIMITER //
DROP PROCEDURE IF EXISTS checkbox;
CREATE PROCEDURE checkbox(IN FieldName VARCHAR(256), IN FieldValue BOOLEAN, IN linkId INT)
BEGIN

    SET @query = CONCAT('UPDATE links SET ', FieldName, '= ? WHERE linkId = ?');
	PREPARE stmt FROM @query;
	SET @FieldValue = FieldValue;
	SET @linkId = linkId;
	EXECUTE stmt USING @FieldValue, @linkId;
	DEALLOCATE PREPARE stmt;

END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS checkExist;
CREATE PROCEDURE checkExist(IN inputURL VARCHAR(250))
BEGIN
	SELECT COUNT(*) as count FROM links WHERE url=inputURL;
END //
DELIMITER ;
