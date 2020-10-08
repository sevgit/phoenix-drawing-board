defmodule ElixirChannelsWeb.PageController do
  use ElixirChannelsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
