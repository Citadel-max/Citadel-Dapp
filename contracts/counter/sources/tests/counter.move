#[test_only]
module counter::counter_test {
    use sui::test_scenario;
    use counter::counter_system;
    use counter::counter_init_test;
    use counter::counter_schema::Schema;

    #[test]
    public fun inc() {
        let scenario  = counter_init_test::deploy_dapp_for_testing(@0xA);

        let mut schema = test_scenario::take_shared<Schema>(&scenario);

        assert!(schema.value().get() == 0);

        counter_system::inc(&mut schema, 10);
        assert!(schema.value().get() == 10);

        counter_system::inc(&mut schema, 10);
        assert!(schema.value().get() == 20);

        test_scenario::return_shared(schema);
        scenario.end();
    }
}
