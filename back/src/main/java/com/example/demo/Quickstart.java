package com.example.demo;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;
import java.nio.file.Paths;

public class Quickstart {

    public static void main(String[] args) {
         // Create the CqlSession object:
         try (CqlSession session = CqlSession.builder()
            .withCloudSecureConnectBundle(Paths.get("./secure-connect.zip"))
            .withAuthCredentials("ejbYxfYnIkjWuYmSSDuHlOcY","GA+6AhmFdlknN2,0f1ZOlvca2ZKrrvQ1.uGrUfWeGDQICR-,h75Acu1vZWlkWfAsqlXjkcmisu02wF.7BFkIqhhxD-OsXZQZNkAtZpxwmD-E6wEsUOZYAuk-eWKnhQHK")
            .build()) {
            // Select the release_version from the system.local table:
            ResultSet rs = session.execute("select release_version from system.local");
            Row row = rs.one();
            //Print the results of the CQL query to the console:
            if (row != null) {
               System.out.println(row.getString("release_version"));
            } else {
               System.out.println("An error occurred.");
            }
         }
         System.exit(0);
   }
}