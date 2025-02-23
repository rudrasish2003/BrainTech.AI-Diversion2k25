// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Blog {
    struct Comment {
        address commenter;
        string text;
    }

    struct Post {
        string title;
        string contentHash; // IPFS hash of the content
        address author;
        uint256 timestamp;
        uint256 likes;
        Comment[] comments;
    }

    Post[] public posts;

    event PostCreated(uint256 indexed postId, string title, string contentHash, address indexed author, uint256 timestamp);
    event PostLiked(uint256 indexed postId, uint256 newLikes);
    event CommentAdded(uint256 indexed postId, address indexed commenter, string text);

    function createPost(string memory _title, string memory _contentHash) public {
        posts.push();
        uint256 postId = posts.length - 1;
        posts;
        
        emit PostCreated(postId, _title, _contentHash, msg.sender, block.timestamp);
    }

    function likePost(uint256 postId) public {
        require(postId < posts.length, "Post does not exist");
        posts[postId].likes += 1;
        emit PostLiked(postId, posts[postId].likes);
    }

    function addComment(uint256 postId, string memory _comment) public {
        require(postId < posts.length, "Post does not exist");
        posts[postId].comments.push(Comment(msg.sender, _comment));
        emit CommentAdded(postId, msg.sender, _comment);
    }

    function getPosts() public view returns (Post[] memory) {
        return posts;
    }

    function getComments(uint256 postId) public view returns (Comment[] memory) {
        require(postId < posts.length, "Post does not exist");
        return posts[postId].comments;
    }
}
