#[allow(lint(share_owned))]module counter::counter_genesis {

  use std::ascii::string;

  use sui::clock::Clock;

  use counter::counter_dapp_system;

  public entry fun run(clock: &Clock, ctx: &mut TxContext) {
    // Create schemas
    let mut schema = counter::counter_schema::create(ctx);
    // Setup default storage
    counter_dapp_system::create(&mut schema, string(b"counter"),string(b"counter contract"), clock , ctx);
    // Logic that needs to be automated once the contract is deployed
    counter::counter_deploy_hook::run(&mut schema, ctx);
    // Authorize schemas and public share objects
    sui::transfer::public_share_object(schema);
  }
}
