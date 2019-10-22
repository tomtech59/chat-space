class MessagesController < ApplicationController
  before_action :set_group

  def index
    @group = Group.find(params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
