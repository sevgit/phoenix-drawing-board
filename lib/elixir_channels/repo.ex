defmodule ElixirChannels.Repo do
  use Ecto.Repo,
    otp_app: :elixir_channels,
    adapter: Ecto.Adapters.Postgres
end
