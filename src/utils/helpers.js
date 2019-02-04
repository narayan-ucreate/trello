
const acceptedTrelloEvent = () => {
    return [
        'action_move_card_from_list_to_list',
        'action_add_label_to_card',
        'action_remove_label_from_card',
        'action_added_member_to_board',
        'action_added_list_to_board',
        'action_move_card_from_list_to_list',
        'action_added_member_to_card',
        'action_create_card',
        'action_member_joined_card',
        ''
    ];
}
module.exports = {
    acceptedTrelloEvent
}