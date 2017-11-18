class ShowlogallsupportController {
  constructor($rootScope, $window, $anchorScroll, ChatService, showlogallsupportService) {
		this.$rootScope = $rootScope;
		this.showlogallsupportService = showlogallsupportService;
		
		console.log($rootScope.activeConversation);

		$rootScope.get_show_log_all = (Conversation) => {
			this.log_allsupport = '';
			let data_query = {
				'project': $rootScope.project,
	            'idChat': Conversation.chat_id,
	            'thisSupport_id': $rootScope.current_user,
			};
			console.log(data_query);
			this.showlogallsupportService.loadLogAllSupport(data_query, res => {
	        	if(res.status == 1){
	        		this.log_allsupport = res.data;
	        	}
	        });
		}
		
  }
}

ShowlogallsupportController.$inject = [
    '$rootScope', '$window', '$anchorScroll',
    'ChatService', 'showlogallsupportService'
];

export default ShowlogallsupportController;
