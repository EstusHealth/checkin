-- Enable RLS on all tables
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE trigger_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocol_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_events ENABLE ROW LEVEL SECURITY;

-- Single-user app: any authenticated user has full access to all rows.
-- Since only Liam will have an account, this is effectively single-user RLS.

-- check_ins
CREATE POLICY "Authenticated users can read check_ins"
  ON check_ins FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert check_ins"
  ON check_ins FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update check_ins"
  ON check_ins FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete check_ins"
  ON check_ins FOR DELETE TO authenticated USING (true);

-- protocols
CREATE POLICY "Authenticated users can read protocols"
  ON protocols FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert protocols"
  ON protocols FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update protocols"
  ON protocols FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete protocols"
  ON protocols FOR DELETE TO authenticated USING (true);

-- trigger_rules
CREATE POLICY "Authenticated users can read trigger_rules"
  ON trigger_rules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert trigger_rules"
  ON trigger_rules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update trigger_rules"
  ON trigger_rules FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete trigger_rules"
  ON trigger_rules FOR DELETE TO authenticated USING (true);

-- protocol_deployments
CREATE POLICY "Authenticated users can read protocol_deployments"
  ON protocol_deployments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert protocol_deployments"
  ON protocol_deployments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update protocol_deployments"
  ON protocol_deployments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete protocol_deployments"
  ON protocol_deployments FOR DELETE TO authenticated USING (true);

-- life_events
CREATE POLICY "Authenticated users can read life_events"
  ON life_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert life_events"
  ON life_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update life_events"
  ON life_events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete life_events"
  ON life_events FOR DELETE TO authenticated USING (true);
