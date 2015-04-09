package com.paulsanwald.scratchpad;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestLogger {

    private static final Logger LOG = LoggerFactory.getLogger(TestLogger.class);

    public static void main(String[] args) {

        System.out.println("Hello");
        LOG.info("Testing Syslog");
    }
}
