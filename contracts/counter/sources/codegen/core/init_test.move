#[test_only]module counter::counter_init_test {

  use sui::clock;

  use sui::test_scenario;

  use sui::test_scenario::Scenario;

  public fun deploy_dapp_for_testing(sender: address): Scenario {
    let mut scenario = test_scenario::begin(sender);
    let ctx = test_scenario::ctx(&mut scenario);
    let clock = clock::create_for_testing(ctx);
    counter::counter_genesis::run(&clock, ctx);
    clock::destroy_for_testing(clock);
    test_scenario::next_tx(&mut scenario,sender);
    scenario
  }
}
