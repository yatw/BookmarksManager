USE heroku_af4745ddf02c336;


CREATE TABLE IF NOT EXISTS tags(
    tagId INT AUTO_INCREMENT,
    name VARCHAR(20),
    PRIMARY KEY (tagId)
);

CREATE TABLE IF NOT EXISTS linkTag(
	ltId INT AUTO_INCREMENT,
    link INT NOT NULL,
    tag INT NOT NULL,
    PRIMARY KEY (ltId),
    FOREIGN KEY (link) REFERENCES links(linkId),
    FOREIGN KEY (tag) REFERENCES tags(tagId)
);

CREATE TABLE IF NOT EXISTS links (
    linkId INT AUTO_INCREMENT,
    title VARCHAR(255),
    detail VARCHAR(255),
    url VARCHAR(255),
    createdDate DATE,
    star BOOLEAN,
    completed BOOLEAN,
    PRIMARY KEY (linkId)
);
