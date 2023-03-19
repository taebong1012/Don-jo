// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 <0.9.0;

import "./ItemDonation.sol";
import "./BasicDonation.sol";
import "./WishlistDonation.sol";

contract Application is ItemDonation, BasicDonation, WishlistDonation {
  address owner;

  constructor(){
    owner = msg.sender;
  }

  // ================= Frontend Call =================
  // 기본 도네이션 실행
  function callBasicDonation(address payable _to) external payable returns(uint256) {
    return _transfer(_to, msg.value);
  }
  // 아이템 구매
  function buyItemDonation(address payable _to, uint256 _itemId) external payable returns(uint256) {
    return _buyItem(_to, _itemId, msg.value);
  }
  // 위시 리스트 구매
  function buyWishilistDonation(address payable _to, uint256 _wishlistId) external payable returns(uint256) {
    return _buyWishlist(_to, _wishlistId, msg.value);
  }

  // ================= Backend Call =================
  // 멤버의 아이템 리스트 가져오기  
  function getMemberItemList(address _address) external view returns(Item[] memory){
    return _getItemList(myItems[_address]);
  }

  // 특정 아이템 상세 조회하기
  function getItemDetail(uint256 _id) external view returns(Item memory){
    return _getItemDetail(_id);
  }

  // 멤버의 아이템 추가하기
  function addMemberItem(string memory _title, string memory _imgPath, string memory _description, uint _price, string memory _message, string memory _filePath, address _seller) external{
    _createItem(_title, _imgPath, _description, _price, _message, _filePath, _seller);
  }

  // 멤버의 아이템 삭제하기
  function deleteMemberItem(address _address, uint256 _id) external {
    _deleteItem(_address, _id);
  }

  // 멤버의 아이템 수정하기
  function updateMemberItem(string memory _title, string memory _imgPath, string memory _description, uint _price, string memory _message, string memory _filePath, address _seller, uint256 _id) external {
    _updateItem(_title, _imgPath, _description, _price, _message, _filePath, _seller, _id);
  }

  // 멤버의 위시리스트 목록 가져오기
  function getMemberWishLists(address _address) external view returns(Wishlist[] memory){
    return _getWishlists(myWishlists[_address]);
  }

  // 멤버의 위시리스트 상제 조회하기
  function getMemberWishListDetail(uint256 _id) external view returns(Wishlist memory){
    return _getWishlistDetail(_id);
  }

  // 멤버의 위시리스트 추가하기
  function addMemberWishList(address _address, Wishlist memory _wishlist) external{
    _createWishlist(_address, _wishlist);
  }

  // 멤버의 위시리스트 삭제하기
  function deleteMemberWishlist(address _address, uint256 _id) external {
    _deleteWishlist(_address, _id);
  }

  // 멤버의 위시리스트 수정하기
  function updateMemberWishlist(address _address, Wishlist memory _wishlist) external {
    _updateWishlist(_address, _wishlist);
  }

  // 후원 상세 정보 조회
  function getSupportDetail(address _address, uint256 _id) external view returns(Support memory){
    return _getSupportDetail(_address, _id);
  }

  // 후원 받은 내역 조회
  function getSupportList(address _address) external view returns(Support[] memory){
    return _getSupportList(_address);
  }

}