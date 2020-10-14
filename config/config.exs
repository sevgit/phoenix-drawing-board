# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :elixir_channels,
  ecto_repos: []

# Configures the endpoint
config :elixir_channels, ElixirChannelsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "eHhvBZHsi/g57fd5Rl4azyqH1ubOe35WCbOivBKAw0TFh3zZHLUn5ttB0wrJWgZX",
  render_errors: [view: ElixirChannelsWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ElixirChannels.PubSub,
  live_view: [signing_salt: "ZtrKYTdc"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
